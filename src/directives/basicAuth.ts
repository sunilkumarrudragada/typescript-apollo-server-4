import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';

/**
 * This directive authenticates queries and mutations using the basic authentication method.
 * Note: It requires either the `requireBasicAuth` or the `authenticate` directive to be applied.
 *
 * @param {string} directiveName - The name of the directive to apply basic authentication.
 * @return {(schema: GraphQLSchema) => GraphQLSchema} - A function that modifies the GraphQLSchema
 *         to include basic authentication for the specified directive.
 */
function basicAuthDirective(directiveName: string): (schema: GraphQLSchema) => GraphQLSchema {
  return schema =>
    mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: fieldConfig => {
        const basicAuthDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
        if (basicAuthDirective) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          return {
            ...fieldConfig,
            resolve: async function (source, args, context, info) {
              console.log('Hey I am working');
              return resolve(source, args, context, info);
            },
          };
        }
      },
    });
}

export default basicAuthDirective;

