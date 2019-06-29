module.exports = {
  app: {
    // Para cuando sea necesario formar rutas absolutas
    backendPath: "/home/musicpanel/backend",
    songsPath: "uploads"
  },
  sequelize: {
    connUrl: "mariadb://musicpanel:musicpanel@localhost:3306/musicpanel"
  }
}
