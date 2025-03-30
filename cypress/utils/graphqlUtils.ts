import { CyHttpMessages } from 'cypress/types/net-stubbing'

export const hasOperationName = (
    req: CyHttpMessages.IncomingHttpRequest,
    operationName: string
) => {
    const { body } = req
    return (
        Object.prototype.hasOwnProperty.call(body, 'operationName') &&
        body.operationName === operationName
    )
}

export const aliasQuery = (
    req: CyHttpMessages.IncomingHttpRequest,
    operationName: string
) => {
    if (hasOperationName(req, operationName)) {
        req.alias = `gql${operationName}Query`
    }
}

export const aliasMutation = (
    req: CyHttpMessages.IncomingHttpRequest,
    operationName: string
) => {
    if (hasOperationName(req, operationName)) {
        req.alias = `gql${operationName}Mutation`
    }
}
