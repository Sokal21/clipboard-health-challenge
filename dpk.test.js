const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partition key in the event if it has 256 or less chars", () => {
    const TEST_KEY = "This is a key provided";

    const key = deterministicPartitionKey({
      partitionKey: TEST_KEY,
    });
    expect(key).toBe(TEST_KEY);
  });

  it("Returns the partition key stringified if this string has 256 or less chars", () => {
    const TEST_KEY = {
      test: {
        again: "testify",
      },
    };

    const key = deterministicPartitionKey({
      partitionKey: TEST_KEY,
    });
    expect(key).toBe(JSON.stringify(TEST_KEY));
  });

  it("Returns a generated partition key if the provided partition key has more that 256 chars", () => {
    const TEST_KEY =
      "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862111c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862111";

    const key = deterministicPartitionKey({
      partitionKey: TEST_KEY,
    });

    expect(key).not.toBe(TEST_KEY);
    expect(TEST_KEY.length).toBeGreaterThan(256);
    expect(key.length).toBeLessThanOrEqual(256);
  });

  it("Returns a generated partition key if the stringified partition key has more that 256 chars", () => {
    const TEST_KEY = {
      key1: "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862111c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc79",
      key2: "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862111c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862111",
    };

    const key = deterministicPartitionKey({
      partitionKey: TEST_KEY,
    });

    expect(key).not.toBe(JSON.stringify(TEST_KEY));
    expect(JSON.stringify(TEST_KEY).length).toBeGreaterThan(256);
    expect(key.length).toBeLessThanOrEqual(256);
  });

  it("Returns always the same for a given input", () => {
    const key = deterministicPartitionKey({
      data1: "test data 1",
      data2: "test data 2",
      data3: "test data 3",
    });

    expect(key).toBe("8e3c6d1449b8e9b6e10742ee1d4f78fd3ea5d0d125bda67612e367119f482babda9c67f63d0f1cb5d6fa5d7e70b67cdb827c86686c1165473122def0682cfe21");
  })
});
