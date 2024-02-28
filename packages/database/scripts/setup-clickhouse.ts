const creationQuery = `CREATE TABLE events
(
    uuid String,
    date DateTime,
    name String,
    visitorId String,
    browser String,
    os String,
    url String,
    referer Nullable(String),
    data Nullable(String),
    projectUuid Nullable(String),
    sessionUuid Nullable(String),
    viewportHeight Nullable(Int32),
    viewportWidth Nullable(Int32)
)
ENGINE = MergeTree()
ORDER BY (date, uuid);
`;
