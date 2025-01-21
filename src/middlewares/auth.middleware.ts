
const validarJWT = async( req: Request, res: Response, next ) => {

    try {

        const token = req.header('x-token');

        if ( !token ) {
            return res.status(401).json({
                status: 401,
                error: 'TOKEN_INVALID',
                message: 'No hay token en la petición.'
            });
        }

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );// se va al catch cuando algo falla o no es valido el token
        const usuario = await Usuario.findById( uid ).populate('permiso');

        if ( !usuario ) {
            return res.status(401).json({
                status: 401,
                error: 'TOKEN_INVALID',
                message: 'Token no valido'
            });
        }

        if ( !usuario.estado ) {
            return res.status(401).json({
                status: 401,
                error: 'TOKEN_INVALID',
                message: 'Token no valido'
            });
        }
        
        req.usuario = usuario;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            status: 401,
            error: 'TOKEN_INVALID',
            message: 'Token no valido'
        });
        
    }
    
}