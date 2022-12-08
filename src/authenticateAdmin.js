// Admin authentication middleware
function createError(path, method) {
    const error = {
        error: -1,
    }
    if (path && method) {
        error.descripcion = `ruta '${path}' metodo '${method}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

const isAdmin = true

exports.authenticateAdmin = function(req, res, next) {
    if (!isAdmin) {
        res.json(createError(req.url, req.method))
    } else {
        next()
    }
}
