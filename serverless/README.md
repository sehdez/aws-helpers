# Serverless

- Crear un nuevo preoyecto serverless
```
    serverless create --template aws-nodejs --path 1-HolaMundo --name HolaMundo
```

- Hacer un despliegue
```
    serverless deploy --verbose
```
- Llamar a una función:
```
    serverless invoke --function nombre-funcion
```
- Ver Logs de una api 
```
    serverless logs -f nombre-funcion --tail
```
- Ver info de un deploy
```
    serverless info
```
- Usar nodemon para desarrollo
```
    nodemon --exec 'sls offline start'
```


