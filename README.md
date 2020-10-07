# GraphQl curso introductorio
## Este curso pretende dar un primer acercamiento a grapql. Entender lo que es, sus componentes principales y cúales son los beneficios que ofrece.

### Contenido del curso:

**Índice**
1. [Tema 1: ¿Qué es GraphQL?](#id1)
2. [Tema 2: Hola mundo con Grapql,Nodejs, express](#id2)
3. [Tema 3: Definición de Schema y de tipos](#id3)
4. [Tema 4: Resolvers](#id4)
5. [Tema 5: Conexión con Base de datos](#id5)
6. [Tema 6: Fragments, Interfaces, Unions](#id6)

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
        `
     
   ```
  Para explicar los types, crearemo una pequeña aplicación que llamé miniTwitter. El código estará disponible dentro de este mismo repositorio.

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
  - allTwitts:[Twitt!]! devuelve una lista que contiene un type definido por nostos llamado Twitt.
  - allUsers:[User!]! devuelve una lista que contiene un type definido por nostos llamado User.


  #### type Mutation
  La diferencia entre Mutation y Query es la intención. Mientras Query nos permite consultar, Mutation se usa cuando se desea cambiar el estado de nuestra aplicación. Cabe resaltar que podemos usar Query dentro de Mutation, si requerimos consultar alguna información del usario que creo el twitt por ejemplo.
  Mutation Son las acciones que los usuarios pueden hacer con nuestro servicio.

  Por ejemplo:
  ``` 
     const typeDefs = gql`
      type Mutation{
          createTwitt(text:String!):Twitt!,
          createUser(name:String!, email:String!):User!
        }
      `
  ```
  Con Mutation definimos las acciones que puede hacer el usario; en este caso,
  hemos definido las siguientes:

  - **createTwitt(text:String!):Twitt!**
    - Estamos definiendo que  los usurios de nuestro servicio pueden crear twitts. 
      Para ello le pedimos que debe pasar como parámetro, un texto (text:String!) y definimos también que se debe retornar un type Twitt.
  - **createUser(name:String!, email:String!):User!**
    - Los usuarios de nuestro servicio, se pueden registrar y crear su propia cuenta, para eso creamos esta definición. Indicamos que se deben pasar dos parámetros de tipo String(name, email). A su vez esta definición debe retornar un type User.

  **Nota:**
   Tanto en las definiciones anteriores, como en el ejemplo de Query hacemos uso del símbolo(!). Este símbolo indica que el parámetro o el type donde es aplicado no puede ser nulo, es decir hace obligatorio el elemento donde es aplicado ejemplo: createUser(name:String!, email:String!) ambos parametros son requeridos. Si se quisiera permitir parametros opcionales, no se usa el símbolo(!) por ejemplo: createUser(name:String, email:String)

  
  #### type Subscription
  Subscription nos permite implementar en nuestro servicio funcionalidad en tiempo real. Pero hablaremos de Subscription en un tema aparte dedicado solo este type.

  
  #### Tipos definidos por nosotros.
  Un servicio en GraphQL se construye a base de tipos(type). Por supuesto podemos definir nuestros propios tipos que reflejan la información que se puede consultar a través de nuestro servicio.

  Un type está compuesto de una serie de campos(clave - valor), que son la definición  de la información que ese type en particular debe tener.
   Por ejemplo:

  ```
  const typeDefs = gql`
      type Twitt{
          id: ID!
          text: String!,
          date: Date!,
          creator: User!
      }
   `
  ```

  En el ejemplo anterior, definimos el type Twitt. Este a su vez, tiene los siguientes campos:
   - **id:** es de tipo ID, que es una cadena única que identifica al objeto. Podemos notar que usar el símbolo(!) lo que indica que este campo no puede ser nulo.
   - **text:** campo de tipo String y también es obligatorio.
   - **date:** campo de un tipo Scalar definido por nostros. No puede ser nulo.
   - **creator:** este campo define una relación entre el  type Twitt con otro tipo el type User, que definiremos en un momento. Este campo hace referencia al usuario que creo el Twitt, por lo tanto no puede ser nulo.

  Creamos ahora el type User.
  ```
  const typeDefs = gql`
      type User{
       id: ID!,
       name: String!
       email: String!
      }
   `
  ```
  Este nuevo type  tiene los siguientes campos
  - **id** De tipo ID, identificador único que no puede ser nulo.
  - **name** De tipo String y es obligatorio.
  - **email** Tambien de tipo String y no puede ser nulo.


  Como pudimos ver en el type Twitt utilizamos un valor Scalar de tipo Date. Pero para poder utilizarlo debemos definirlo.
  ```
   const typeDefs = gql`
      scalar Date 
    `
  ```

  Ahora sabemos que los Schema en GraphQl se construyen a traves de definiciones de tipos. 
  Un Shcema describe la forma de los datos, pero no los obtiene por si mismo este trabajo lo hacen los resolvers que vermos en el siguiente tema.


<div id='id4'/>

#### Tema 4: Resolvers
   Los resolvers son funciones que se encargan de retornar los datos para campos particulares. Los datos son retornados en los tipos y formas definidos en el Schema.

   Los resolvers pueden ser asíncronos y con ellos podemos actualizar datos desde una API rest, una base de datos, o cualquier otro tipo de servicios. Estos pueden retornar objetos(tipos) o valores scalares como Strings, Int,etc.

   Los resolvers son un punto clave en la implentación de GraphQL.

   Definamos nuestros resolvers

  ```
   const resolvers = {
    Query:{
        totalTwitts:()=> twitts.length,
        allTwitts:()=> twitts,
        allUsers:()=> users
    }  
  }
  ```

  Como vemos generamos los resolver para nuestras consultas(Query resolver). Creamos las siguentes 3 funciones:
  - totalTwitts: que nos devuelve un scalar de tipo entero.
  - allTwitts: que nos devuelve una lista de objectos del tipo Twitt.
  - allUsers: esta funcion nos devuelve una lista de objetos de tipo User.

  Es muy importante observar, que  la funciones definidas dentro del Query resolver, siguen la definición del Schema; es decir si recordamos la definición que type Query, podemos ver que los resolver que escribimos aquí son un fiel reflejo de esa definición.

  Continuando con nuestros resolvers:

  ```
   const resolvers = {
    Query:{
        totalTwitts:()=> twitts.length,
        allTwitts:()=> twitts,
        allUsers:()=> users
    },  
     Mutation:{
        createTwitt:(parent, payload)=>{
              const newTwitt ={
                  id : uuidv4(),
                  ...payload,
                  date: Date.now()
              }
              twitts.push(newTwitt)
              return newTwitt
        },
        createUser:(parent, payload)=>{
            const newUser ={
                id: uuidv4(),
                ...payload
            }
            users.push(newUser)
            return newUser
        }
    }
  }
  ```
  Ahora añadimos el Mutation resolver. Al igual que en Query en Mutation, definimos funciones, que nos ayudaran a actualiar o cambiar el estado de la aplicación.

  Podemos ver que los resolvers puede recibir parámetros. Hablaremos des estos parámetros acontinuación:
  
  - root o parent: Hace referencia al root resolver previo, es decir al root donde se encuentra definida la funcion.
    ```
    Mutation:{
          createTwitt:(parent, payload)=>{...},
    }
    ```
    En código anterior observamos que la función createTwitt recibe como primer parámetro parent(root). En este caso el Root es Mutation resolver.

  - payload o args: Son los argumentos que pasamos en la definición del Schema.
    Si recordamos, la definición del type Mutation luce así:
    ```
      type Mutation{
          createTwitt(text:String!):Twitt!,
          createUser(name:String!, email:String!):User!
        } 
    ```
    
    Vemos que la implementación en Mutation resolver se orienta por la difinición en type Mutation del Schema. Allí por ejemplo en la función createUser(name:String!, email:String!), definimos que reciben 2 parámetros: name, email. En los resolvers, todos los  parámetros que definamos vienen dentro de payload por lo que podríamos hacer lo siguiente dentro de la función:
    ```
      const {name, email} = payload
      // ó 
      payload.name
    ```
    Para acceded a los parametros definidos en el Schema.
- contex: un objeto mutable que se provee a todos los resolvers
- info: Información relevante acerca del query


<div id='id5'/>

#### Tema 5: Conecxión con base de datos
   En construcción


<div id='id6'/>

#### Tema 6: Fragments, Interfaces, Unions
   En construcción
   


  

