# Apollo Server for Contentful

Service to provide a single response from data sources using GraphQL and Apollo.

1. Dummy Apollo
2. Copy .env
3. How Gateway connects and what implies?
4. Connect Apollo - Contentful BB
5. Introspect BB






## Path '/graphql'

Apollo it's not flexible when defines which incoming path should listen. By default, receives all incoming request to port 4000. Adapt Apollo to receive only '/graphql' becomes into follow graphql-gateway pattern which becomes in less scalation flexibility.


## Datasources

### Contentful 

Total connection to whole data.


### AppSync

* Operation

Provides a TypeDefs to define what data to be shared, set the resolvers as a remote appsync endpoint via http request.


---


# Apollo/GraphQL Federation/Supergraph

## Subgraphs

In a supergraph, your schema is built in smaller parts. The division of these parts is usually based on domain or on which team manages that part of the schema.

> Each part of the schema is owned by a separate subgraph. A subgraph is a standalone GraphQL server with its own schema file, resolvers, and data sources. 
> Note: If you've worked with a microservice architecture before, this might look familiar. You can think of subgraphs as a way to orient the design of your graph's schema around your microservice architecture.




## The router

A supergraph architecture also includes the router, which sits between clients and the subgraphs. The router is responsible for accepting incoming operations from clients and splitting them into smaller operations that can each be resolved by a single subgraph.


## The supergraph schema

The supergraph schema is composed of all the fields and types from each subgraph schema.








