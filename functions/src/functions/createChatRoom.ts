import * as functions from "firebase-functions";
import firestore from "../singleton/firestore";

const createChatRoom = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "This function requires the user to be authenticated."
    );
  }

  const isTextType = data["name"];
  if (typeof data["name"] !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "`text` must be a string."
    );
  }

  firestore.collection("chat_rooms").add({
    name: isTextType
  });
});

export default createChatRoom;
