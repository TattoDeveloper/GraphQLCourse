# GraphQl curso introductorio
## Este curso pretende dar un primer acercamiento a grapql. Entender lo que es, sus componentes principales y cúales son los beneficios que ofrece.

### Contenido del curso:

**Índice**
1. [Tema 1: ¿Qué es GraphQL?](#id1)
2. [Tema 2: Hola mundo con Grapql,Nodejs, express](#id2)
3. [Tema 3: Definición de tipos](#id3)
4. [Tema 4: Mutaciones](#id4)

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

  - Versionado: Si se necesita dar soporte al versionado de una API, con rest esto tal vez signifique crear nuevos endpoints, lo cual impacta directamente el posterior mantenimiento. Mientras que con GraphQL podemos simplemente añadir más campos o tipos, sin que esto implique romper los queries existentes.
  Más adelate ahodaremos en los tipo en GraphQL.

<div id='id2'/>

#### Tema 2: Hola mundo con Graphql,Nodejs, express

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
         "dev": "nodemon src/hello/app.js"
      }
 
    ```
  - En app.js  importamos las dependecias que necesitamos
    ```
     const express = require('express')
     const {ApolloServer,gql} = require('apollo-server-express')
    ```
  - Inicializamos express, los typeDefs y los resolvers
    ```
      const app = express();
      const typeDefs = gql`
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
    - Para definir los typeDefs utilizamos gql que es un Tagged Template Literals que nos da la habilidad de llamar funciones utilizando el poder de los template strings

    - Definimos un type Query que nos va permitir correr nuestra consulta

    - Definimos un type User que tiene dos campos ID que es un string único. El signo ! indica que el campo es obligtario(no-nullable). Támbien definimos el campo name que es un String y tambíen es obligatorio.

    - También definimos un resolve para obtener los datos. Los resolvers son una colección de funciones encargadas de obtener los datos que requerimos.
  - Ahora inicializamos Apollo server y pasamos  app(express) a 
    la función applyMiddleware() del servidor.

    ```
    const server = new ApolloServer({
      typeDefs,
      resolvers
      });
    
     server.applyMiddleware({app});
    
    ```
    - ApolloServer requiere 2 parámetros: los typeDef y los resolvers
  
  - Ahora le decimos al servidor que escuche el puerto que     deseamos 
    ``` 
     app.listen(3000,()=> console.info("Running....."));
    ```
  - Por último, corremo el comando que definimos el package.json para ejecutar nuestra aplicación.
    - En la terminal corremos el siguiente comando.
    ```
      npm run dev
    ```
    Esto nos levanta la aplicación el puerto indicado.
- En este punto en el navegador colocaremos la siguiente url
para probar nuestra aplicación.

```
 http://localhost:3000/graphql
```
- En lado izquierdo de la pantalla que nos habilita, corremos la siguiente consulta.
```
   { 
    me{
      name
    }
  }
```
Y al darle al botón play nos corre la consuta.
  
![Screenshot](screens/tema_1.JPG)


<div id='id3'/>

#### Tema 3: Definición de Schema y de tipos
   Un Schema en GraphQl nos permite describir la funcionalidades disponibles
   para nuestra aplicación. 
   Distinto a Rest que se depliega como una colección de Endpoints, en GraphQl pensamos y hablamos en tipos de datos y nuesta API expone una colleción de tipos datos
   que llamamos Schema.
   Los Schema se construyen a principalmente a partir de types y resolvers. 

   GraphQl provee roots types, que ya vienen integrados a la especificación, pero también nos permite definir nuevos types.

   Root Types:
   
   ``` 
    const typeDefs = gql`
        type Query{...}
        type Mutation{...}
        type Subscription{...}
     
   ```

  #### type Query
   Con el type Query podemos definir todas las consultas(queries) que se pueden hacer a traves de nuestro aplicación. Por Ejemplo:
   ```
     const typeDefs = gql`
        type Query{
          totalTwitts:Int!,
          allTwitts:[Twitt!]!,
          allUsers:[User!]!   
        }
      `
   ```
  
  Como se puede ver, en la definición del type Query incluimos consultas de direfentes tipos. 
  - totalTwitts:Int!: nos devuelve un entero (Scalar type)
  - allTwitts:[Twitt!]! devuelve una lista que contiene un type definido por nostos llamado Twitt
  - allUsers:[User!]! devuelve una lista que contiene un type definido por nostos llamado User
  

<div id='id4'/>

#### Tema 4: Resolvers
   En construcción
   


  

