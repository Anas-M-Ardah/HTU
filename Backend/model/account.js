// models/account.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); // For password hashing

module.exports = (sequelize) => {
    const Account = sequelize.define('accounts', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 50],
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phoneNumber: {
            type: DataTypes.STRING(15),
            allowNull: true,
            validate: {
                is: /^[0-9+-]+$/
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        verificationToken: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        resetPasswordToken: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        resetPasswordExpires: {
            type: DataTypes.DATE,
            allowNull: true
        },
        loginAttempts: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        accountLocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        lockedUntil: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        timestamps: true, // This will add createdAt and updatedAt fields
        hooks: {
            beforeCreate: async (account) => {
                if (account.password) {
                    account.password = await bcrypt.hash(account.password, 12);
                }
            },
            beforeUpdate: async (account) => {
                if (account.changed('password')) {
                    account.password = await bcrypt.hash(account.password, 12);
                }
            }
        }
    });

    // Instance Methods
    Account.prototype.validatePassword = async function(password) {
        return bcrypt.compare(password, this.password);
    };

    Account.prototype.incrementLoginAttempts = async function() {
        this.loginAttempts += 1;
        if (this.loginAttempts >= 5) {
            this.accountLocked = true;
            this.lockedUntil = new Date(Date.now() + 30 * 60 * 1000); // Lock for 30 minutes
        }
        await this.save();
    };

    Account.prototype.resetLoginAttempts = async function() {
        this.loginAttempts = 0;
        this.accountLocked = false;
        this.lockedUntil = null;
        await this.save();
    };

    return Account;
};