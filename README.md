# GraphQl curso introductorio
## Este curso pretende dar un primer acercamiento a grapql. Entender lo que es, sus componentes principales y cúales son los beneficios que ofrece.

### Contenido del curso:

**Índice**
1. [Tema 1: ¿Qué es GraphQL?](#id1)
2. [Tema 2: Hola mundo con Grapql,Nodejs, express](#id2)

<div id='id1'/>

#### Tema 1: ¿Qué es GraphQL?

- GraphQL es un lenguaje de consulta para su API. Una de las carácteristicas principales de GraphQL es que te permite traer solo los datos que en realidad necesitas.
  GraphQL en realidad es una especificación, no una implementación. Por esta razón GraphQL es agnóstica al lenguaje y/o plataforma. Puedes correr GraphQL tanto del lado del cliente, como del servidor. GraphQL Puede ser ejecutado con **Javascript**, **pyhton**, **c#**, entre otros.
  
  Al tratarse de una especificación, pueden existir multiples clientes(implementaciones) incluso para una misma plataforma. Algunos de los clientes más conocidos para GraphQL son **Relay y Apollo**. Relay fue creado por facebook quien además fué el creado de GraphQL; Relay se integra perfectamente con **ReactJS**  que es una libreria para el desarrollo de UI, creada también por facebook. Por su parte Apollo es un cliente open source creado por Meteor Development Group. Apollo es agnóstica a frameworks.
   
  En los próximos temas veremos más en profundidad como está compuesto GraphQL.
  también puedes visitar:
  https://graphql.org/learn/



- GraphQl y API REST

  Explicaremos algunas diferencias entre GraphQL y las API REST

  - Mientras en REST solemos exponer multiples   endpoints, para consultar la información  requerida, con GraphQL tenemos un único endpoint, y sobre el ejecutamos las consultas necesarias.

  - Con GraphQL traemos únicamente la data que nos interesa. Así nos evitamos lo que si puede llegar a suceder con las API REST(Over Fetching, Under Fetching) es decir que traemos datos que realemente no necesitamos, o por el contrario que nos hacen falta datos.

  - Versionado: Si se necesita dar soporte al versionado de una API, con rest esto tal vez signifique crear nuevos endpoits, lo cual impacta directamente el posterior mantenimiento. Mientras que con GraphQL podemos simplemente añadir más campos o tipos, sin que esto implique romper los queries existentes.
  Más adelate ahodaremos en los tipo en GraphQL.

<div id='id2'/>

#### Tema 2: Hola mundo con Graphql,Nodejs, express?

- Instalación de GraphQl,express,Apollo
  
  Como se mencionó en el apartado anterior, existen multiples cliente para GraphQL en multiples plataformas. Para este curso, utilizaremos **Nodejs** que es el runtime que nos permite ejecutar **Javascript** del lado del servidor. Utilizaremos además **express** es un framework lijero que nos permite crear apliaciones web de forma rápida sobre Nodejs. Y como cliente de GraphQL utilizaremos Apollo
  
  **Nota:** Daré por hecho que conoces los fundamentos de Nodejs, por lo que no me detendré a explicarlos

- Hola Mundo

  Primero que nada crearemos nuestro proyecto Node e instalaremos las dependencias necesarias

  - Creamos una carpeta para el proyecto, en mi caso la llameré course

  - Iniciamos un nuevo proyecto
    ``` 
     npm init --yes
    ```
  - Instalamos las dependencias
    ```
      npm install  graphql express apollo-server apollo-server-express nodemon
    ```

  - Ahora crearmos la estructura de directorios para el proyecto
    - Creamos la carpeta src
    - Dentro de src creamos una carpeta llamada hello
    - Dentro de hello crearemos el archivo app.js
    

  - Dentro del package.json añadimos un script
    ```
     "scripts": {
         "dev": "nodemon hello/app.js"
      }
 
    ```
  - En app.js  importamos las dependecias que necesitamos
    ```
     const express = require('express')
     const {ApolloServer,gql} = require('apollo-server-express')
    ```
  - Inicializamos express, los typeDef y los resolvers
    ```
      const app = express();
      const typeDef = gql`
        type Query{
            me: User
        }
        
        type User{
            id: ID!
            name: String!
        }
      const resolvers = {
           Query:{
                me:()=> {
                    return {
                        name:'Developer'
                        }
                }
            }
      }
    ```
    - Para definir los typeDef utilizamos gql que es un Tagged Template Literals que nos da la habilidad de llamar funciones utilizando el poder de los template strings

    - Definimos un type Query que nos va permitir correr nuestra consulta

    - Definimos un type User que tiene dos campos ID que es un string único. El signo ! indica que el campo es obligtario(no-nullable). Támbien definimos el campo name que es un String y tambíen es obligatorio.
  
   


  

