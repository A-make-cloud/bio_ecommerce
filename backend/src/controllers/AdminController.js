const { BaseError, fn, col, Op, query} = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../models/index')
const { Product } = require('../../models');

exports.summary = (req, res) => {
    db.sequelize.query(
        `SELECT 'totalProd' AS 'dataType', COUNT(*) AS 'data' FROM products UNION 
        SELECT 'activProd', COUNT(*) AS 'data' FROM products WHERE status='1' UNION
        SELECT 'outOfStock', COUNT(*) FROM products WHERE quantity=0 UNION
        SELECT 'lowStock', COUNT(*) FROM products WHERE quantity>0 AND quantity<3 UNION
        SELECT 'totalCateg', COUNT(*) FROM categories UNION
        SELECT 'newOrders', COUNT(*) FROM commandes WHERE state='new' UNION
        SELECT 'ordersInProccess', COUNT(*) FROM commandes WHERE state='process' UNION
        SELECT 'totalUsers', COUNT(*) FROM users UNION
        SELECT 'newUsers', COUNT(*) FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 WEEK)`
        , {
        type: Sequelize.QueryTypes.SELECT
        }
    ).then(result=>{
        res.status(200).json({ result })
    })
}
