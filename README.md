# url-shortener-api

## http://localhost:8081/domain

## http://localhost:8081/xbjpC5qZh

// Url duplicada
## http://localhost:8081/shorten
	{
		"url": "https://tiendamia.com"
	}

// Url no existente
## http://localhost:8081/shorten
	{
		"url": "https://tienda-prueba7.com"
	}
	
## http://localhost:8081/auth/register

{
    "name": "Esteban Corigliano",
    "email": "fake@gmail.com",
    "password": "12345678"
}


## http://localhost:8081/auth/login
{
    "email": "fake@gmail.com",
    "password": "12345678"
}



// Se agrega este endpoint para saber si un usuario esta autenticado para manejar la sesión
// Id de mongo ////// no token jwt
## http://localhost:8081/auth/authenticatedUser
{	
    "id": "6120172eea6d113d44236731"
}
