# Gateway Pattern

Use apollo and grapqhl tools to create flexible a subgraph which allows url handling and schemas stichting.

## Path '/graphql'

Apollo it's not flexible when defines which incoming path should listen. By default, receives all incoming request to port 4000. Adapt Apollo to receive only '/graphql' becomes into follow graphql-gateway pattern which becomes in less scalation flexibility.


## Schema Stitching

As graphql-gateway has shown, It's not mandatory to own a complete schema to be allowed to query a data source as AppSync. 

Schema Stitching helps to query once at the same schema and allow teams to define only what they need from secondary sources.

