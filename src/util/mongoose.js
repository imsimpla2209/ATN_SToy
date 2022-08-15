module.exports = {
    multipleMongooseToObject: (mgArray) => {
        return mgArray.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: (mg) => {
        return mg.toObject();
    }
}