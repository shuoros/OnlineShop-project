const addComment = require("../../services/customerService/addComment");
const Response = require("../../services/response");

exports.addComment = async (req, res, next) => {
    try {
        const addingComentResponse = await addComment.add(req);
        let response = new Response(200, "success", addingComentResponse);
        if (addingComentResponse != "") return res.status(200).send(response.handler());
        //res.status(200).send(res.locals.accessToken);
    } catch (e) {
        return res.status(500).send(e);
    }
};