# wakfu-api
 [![Netlify Status](https://api.netlify.com/api/v1/badges/83341ede-6d94-4913-b335-c37726cc459b/deploy-status)](https://app.netlify.com/sites/wakfu-api/deploys)

Projeto Lambda (Serverless) para fornecer dados da API oficial de Wakfu ao WakfuGear.

## Configurações

Os arquivos JSON oficiais da API de Wakfu são salvas no S3 da AWS (Amazon).
* Crie uma conta na AWS e salve a ACCESS KEY (Com o respectivo SECRET).
* Crie um bucket no S3.
* Crie [variáveis de ambiente](https://www.netlify.com/docs/continuous-deployment/?_ga=2.156412605.728163330.1566152904-1872813885.1563017719#build-environment-variables) com as seguintes informações:
```
AWS_ACCESS_KEY_ID = SUA_KEY
AWS_SECRET_ACCESS_KEY = SECRET_DA_KEY
S3_BUCKET_NAME = NOME_DO_BUCKET
```

## Executando o projeto

Para rodar o projeto localmente utilize o comando:
```
npm start
```

Para dar deploy, utilize o comando:
```
npm run build
```

O projeto já está configurado para deploy automático na Netlify assim que a Master (branch) é atualizada.

# English

# wakfu-api
Lambda Project (Serverless) to provide data from the official Wakfu API to WakfuGear.

## Settings

The official JSON files for the Wakfu API are saved to AWS S3 (Amazon).
* Create an AWS account and save the ACCESS KEY (with the respective SECRET).
* Create a bucket in S3.
* Create [Environment Variables](https://www.netlify.com/docs/continuous-deployment/?_ga=2.156412605.728163330.1566152904-1872813885.1563017719#build-environment-variables) with the following information:
```
AWS_ACCESS_KEY_ID = SUA_KEY
AWS_SECRET_ACCESS_KEY = SECRET_DA_KEY
S3_BUCKET_NAME = NOME_DO_BUCKET
```

## Executing the project

To run the project locally use the command:
```
npm start
```

To deploy, use the command:
```
npm run build
```

The project is already configured for automatic deployment on Netlify as soon as the Master (branch) is updated.
