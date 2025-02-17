CREATE DATABASE zstart;
CREATE DATABASE zstart_cvr;
CREATE DATABASE zstart_cdb;

\c zstart;

CREATE TABLE "app_user" (
  "id" VARCHAR PRIMARY KEY,
  "a" VARCHAR,
  "b" VARCHAR,
  "c" VARCHAR,
  "d" VARCHAR,
  "e" VARCHAR,
  "f" VARCHAR
);

CREATE TABLE "organization" (
  "id" VARCHAR PRIMARY KEY,
  "parent_id" VARCHAR,
  "a" VARCHAR,
  "b" VARCHAR,
  "c" VARCHAR,
  "d" VARCHAR,
  "e" VARCHAR,
  "f" VARCHAR,
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

INSERT INTO "app_user" (id, a, b, c, d, e, f) VALUES ('1', 'a1', 'b1', 'c1', 'd1', 'e1', 'f1');
INSERT INTO "app_user" (id, a, b, c, d, e, f) VALUES ('2', 'a2', 'b2', 'c2', 'd2', 'e2', 'f2');
INSERT INTO "app_user" (id, a, b, c, d, e, f) VALUES ('3', 'a3', 'b3', 'c3', 'd3', 'e3', 'f3');
INSERT INTO "app_user" (id, a, b, c, d, e, f) VALUES ('4', 'a4', 'b4', 'c4', 'd4', 'e4', 'f4');
INSERT INTO "app_user" (id, a, b, c, d, e, f) VALUES ('5', 'a5', 'b5', 'c5', 'd5', 'e5', 'f5');
INSERT INTO "app_user" (id, a, b, c, d, e, f) VALUES ('6', 'a6', 'b6', 'c6', 'd6', 'e6', 'f6');
INSERT INTO "app_user" (id, a, b, c, d, e, f) VALUES ('7', 'a7', 'b7', 'c7', 'd7', 'e7', 'f7');
INSERT INTO "app_user" (id, a, b, c, d, e, f) VALUES ('8', 'a8', 'b8', 'c8', 'd8', 'e8', 'f8');
INSERT INTO "app_user" (id, a, b, c, d, e, f) VALUES ('9', 'a9', 'b9', 'c9', 'd9', 'e9', 'f9');
INSERT INTO "app_user" (id, a, b, c, d, e, f) VALUES ('10', 'a10', 'b10', 'c10', 'd10', 'e10', 'f10');

INSERT INTO "organization" (id, a, b, c, d, e, f) VALUES ('org1', 'a1', 'b1', 'c1', 'd1', 'e1', 'f1');
INSERT INTO "organization" (id, parent_id, a, b, c, d, e, f) VALUES ('org2', 'org1', 'a2', 'b2', 'c2', 'd2', 'e2', 'f2');
INSERT INTO "organization" (id, a, b, c, d, e, f) VALUES ('org3', 'a3', 'b3', 'c3', 'd3', 'e3', 'f3');
INSERT INTO "organization" (id, parent_id, a, b, c, d, e, f) VALUES ('org4', 'org3', 'a4', 'b4', 'c4', 'd4', 'e4', 'f4');
INSERT INTO "organization" (id, a, b, c, d, e, f) VALUES ('org5', 'a5', 'b5', 'c5', 'd5', 'e5', 'f5');
INSERT INTO "organization" (id, parent_id, a, b, c, d, e, f) VALUES ('org6', 'org5', 'a6', 'b6', 'c6', 'd6', 'e6', 'f6');
INSERT INTO "organization" (id, a, b, c, d, e, f) VALUES ('org7', 'a7', 'b7', 'c7', 'd7', 'e7', 'f7');
INSERT INTO "organization" (id, parent_id, a, b, c, d, e, f) VALUES ('org8', 'org7', 'a8', 'b8', 'c8', 'd8', 'e8', 'f8');
INSERT INTO "organization" (id, a, b, c, d, e, f) VALUES ('org9', 'a9', 'b9', 'c9', 'd9', 'e9', 'f9');
INSERT INTO "organization" (id, parent_id, a, b, c, d, e, f) VALUES ('org10', 'org9', 'a10', 'b10', 'c10', 'd10', 'e10', 'f10');

INSERT INTO "user_organization" (user_id, organization_id) VALUES ('1', 'org1');
INSERT INTO "user_organization" (user_id, organization_id) VALUES ('2', 'org1');
INSERT INTO "user_organization" (user_id, organization_id) VALUES ('3', 'org3');
INSERT INTO "user_organization" (user_id, organization_id) VALUES ('4', 'org3');
INSERT INTO "user_organization" (user_id, organization_id) VALUES ('5', 'org5');
INSERT INTO "user_organization" (user_id, organization_id) VALUES ('6', 'org5');
INSERT INTO "user_organization" (user_id, organization_id) VALUES ('7', 'org7');
INSERT INTO "user_organization" (user_id, organization_id) VALUES ('8', 'org7');
INSERT INTO "user_organization" (user_id, organization_id) VALUES ('9', 'org9');
INSERT INTO "user_organization" (user_id, organization_id) VALUES ('10', 'org9');
