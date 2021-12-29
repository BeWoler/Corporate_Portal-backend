import { FriendRequestService } from "../services/friendRequest-service";

export class FriendRequestController {
  public static async request(req, res, next) {
    try {
      const { receiverId, senderId } = req.body;
      const request = await FriendRequestService.request(receiverId, senderId);

      return res.json(request);
    } catch (e) {
      next(e);
    }
  }

  public static async accept(req, res, next) {
    try {
      const { receiverId, senderId, requestId } = req.body;
      const accept = await FriendRequestService.accept(
        receiverId,
        senderId,
        requestId
      );

      return res.json(accept);
    } catch (e) {
      next(e);
    }
  }

  public static async decline(req, res, next) {
    try {
      const { requestId } = req.body;
      const decline = await FriendRequestService.decline(requestId);

      return res.json(decline);
    } catch (e) {
      next(e);
    }
  }

  public static async getRequests(req, res, next) {
    try {
      const requests = await FriendRequestService.getRequests(
        req.params.receiverId
      );

      return res.json(requests);
    } catch (e) {
      next(e);
    }
  }
}
