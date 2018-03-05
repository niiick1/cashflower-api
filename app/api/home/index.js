const getHomeService = require('./home')

module.exports = () => {
  const homeService = getHomeService()

  return {
    getVersion(req, res, next) {
      res.json(homeService.getVersion())
    }
  }
}
