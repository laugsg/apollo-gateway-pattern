# Gateway Pattern

This project analize a basic gateway structure based in Apollo.


## Worth to mention

Detected pain points.

### Path '/graphql'

Apollo it's not flexible to define which incoming path should listen. By default, receives all incoming request in root domain ("/") at port 4000. Adapt Apollo to listen to specific paths as '/graphql' would mean to loose flexibility to scale.

From this perspective, an structure based in GraphQL tooling libraries plus Apollo as graphql-gateway did it, would provide complete control about url paths.



---


# Apollo/GraphQL Federation/Supergraph

Definitions, topics and glosary.

## Subgraphs

In a supergraph, your schema is built in smaller parts. The division of these parts is usually based on domain or on which team manages that part of the schema.

> Each part of the schema is owned by a separate subgraph. A subgraph is a standalone GraphQL server with its own schema file, resolvers, and data sources. 
> Note: If you've worked with a microservice architecture before, this might look familiar. You can think of subgraphs as a way to orient the design of your graph's schema around your microservice architecture.

## The router

A supergraph architecture also includes the router, which sits between clients and the subgraphs. The router is responsible for accepting incoming operations from clients and splitting them into smaller operations that can each be resolved by a single subgraph.

## The supergraph schema

The supergraph schema is composed of all the fields and types from each subgraph schema.








