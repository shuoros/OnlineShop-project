const sellerProductService = require("../../../services/productService/seller/sellerService");
const Response = require("../../../services/responses/general");

exports.show = async (req, res, next) => {
    let response = new Response();

    try {
        const productCommentsResponse = await sellerProductService.getProductComments(
            req
        );
        if (productCommentsResponse != "")
            response.setStatus(200).setRes(productCommentsResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
