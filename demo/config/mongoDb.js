module.exports = {
   DB: 'mongodb://localhost:27017/demo',
   mongooseUrl: '${aib.getParam("mongodb.mongooseHost")}:${aib.getParam("mongodb.mongoosePort")}'
};