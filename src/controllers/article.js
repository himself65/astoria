function getArticle (ctx) {
  ctx.body = 'todo'
}

function setArticle (ctx) {
  ctx.body = 'todo'
}

export default {
  name: 'article',
  method: {
    'get': getArticle,
    'put': setArticle
  }
}
