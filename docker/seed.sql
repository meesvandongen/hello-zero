CREATE DATABASE zstart;
CREATE DATABASE zstart_cvr;
CREATE DATABASE zstart_cdb;

\c zstart;

CREATE TABLE "app_user" (
  "id" VARCHAR PRIMARY KEY
);

CREATE TABLE "organization" (
  "id" VARCHAR PRIMARY KEY,
  "parent_id" VARCHAR,
  FOREIGN KEY ("parent_id") REFERENCES "organization"("id")
);

CREATE TABLE "user_organization" (
  "user_id" VARCHAR,
  "organization_id" VARCHAR,
  PRIMARY KEY ("user_id", "organization_id")
);

ALTER TABLE "user_organization"
ADD CONSTRAINT fk_user
FOREIGN KEY ("user_id") REFERENCES "app_user"("id");

ALTER TABLE "user_organization"
ADD CONSTRAINT fk_organization
FOREIGN KEY ("organization_id") REFERENCES "organization"("id");

INSERT INTO "app_user" (id) VALUES ('1');
INSERT INTO "app_user" (id) VALUES ('2');

INSERT INTO "organization" (id) VALUES ('org1');
INSERT INTO "organization" (id, parent_id) VALUES ('org2', 'org1');

INSERT INTO "user_organization" (user_id, organization_id) VALUES ('1', 'org1');
INSERT INTO "user_organization" (user_id, organization_id) VALUES ('2', 'org1');
