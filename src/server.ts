import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod"
import { z } from "zod"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
	origin: true // "http://localhost:3000"
})

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "NLW-connect",
			version: "0.0.1"
		}
	},
	transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
	routePrefix: "/docs"
})

app.post("/subscriptions", {
	schema: {
		body: z.object({
			name: z.string(),
			email: z.string().email(),
		}),
		response: {
			201: z.object({
				name: z.string(),
				email: z.string(),
			})
		}
	}
}, async (request, reply) => {
	const { name, email } = request.body

	return reply.status(201).send({
		name,
		email
	})

})

app.listen({
	port: 3333
}).then(() => {
	console.log("HTTP Server Running");
})
