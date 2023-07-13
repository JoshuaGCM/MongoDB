const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        person: { type: String, default: ""},
        age: { type: Number, default: ""},
        date: { type: Date, default: ""},
    },
    {
        timestamps: {
            createdAt: "createdOn",
            updatedAt: "updatedOn",
        },
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const UserModel = mongoose.model('users', schema);

module.exports = UserModel;