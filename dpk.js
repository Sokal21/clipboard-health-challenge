const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let data;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey) {
    data =
      typeof event.partitionKey === "string"
        ? event.partitionKey
        : JSON.stringify(event.partitionKey);

    if (data.length <= MAX_PARTITION_KEY_LENGTH) {
      return data;
    }
  } else {
    data = JSON.stringify(event);
  }

  return crypto.createHash("sha3-512").update(data).digest("hex");
};
