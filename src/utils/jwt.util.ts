import jwt from 'jsonwebtoken';

export const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        // Validar que la variable de entorno está definida
        const secretKey = process.env.SECRETORPRIVATEKEY;
        if (!secretKey) {
        return reject('Falta la clave secreta para firmar el token (SECRETORPRIVATEKEY)');
        }

        jwt.sign( payload, secretKey, {
            expiresIn: '5h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' );
            } else {
                resolve( token );
            }

        });

    });

}