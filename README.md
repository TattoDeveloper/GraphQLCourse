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

  - Con GraphQL traemos únicamente la data que nos interesa. Así nos evitamos lo que si puede llegar a suceder con las API REST(Over Fetching, Under Fetching) es decier que traemos datos que realemente no necesitamos, o por el contrario que nos hacen falta datos.

  - Versionado: Si se necesita dar soporte al versionado de una API, con rest esto tal vez signifique crear nuevos endpoits, lo cual impactada directamente el posterior mantenimiento. Mientras que con GraphQL podemos simplemente añadir más campos o tipos, sin que esto implique romper los queries existentes.
  Más adelaten ahodaremos en los tipo en GraphQL.

<div id='id2'/>

#### Tema 2: Hola mundo con Graphql,Nodejs, express?

- Instalación de GraphQl,express,Apollo
- Hola Mundo

