CREATE TABLE audit_companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL
);
CREATE TABLE audit_users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    company_id INTEGER REFERENCES companies (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL
);
CREATE OR REPLACE FUNCTION audit_companies_insert_trigger() RETURNS TRIGGER AS $$ BEGIN
INSERT INTO audit_companies (name, created_at, status)
VALUES (NEW.name, current_timestamp, 'active');
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER after_insert_audit_companies
AFTER
INSERT ON companies FOR EACH ROW EXECUTE FUNCTION audit_companies_insert_trigger();
CREATE OR REPLACE FUNCTION audit_companies_update_trigger() RETURNS TRIGGER AS $$ BEGIN
UPDATE audit_companies
SET name = NEW.name,
    created_at = current_timestamp,
    status = 'updated'
WHERE id = NEW.id;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER after_update_audit_companies
AFTER
UPDATE ON companies FOR EACH ROW
    WHEN (
        OLD.* IS DISTINCT
        FROM NEW.*
    ) EXECUTE FUNCTION audit_companies_update_trigger();
CREATE OR REPLACE FUNCTION audit_companies_delete_trigger() RETURNS TRIGGER AS $$ BEGIN
DELETE FROM audit_companies
WHERE id = OLD.id;
RETURN OLD;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER after_delete_audit_companies
AFTER DELETE ON companies FOR EACH ROW EXECUTE FUNCTION audit_companies_delete_trigger();
CREATE OR REPLACE FUNCTION audit_users_delete_trigger() RETURNS TRIGGER AS $$ BEGIN
INSERT INTO audit_users (
        login,
        password,
        role,
        full_name,
        company_id,
        created_at,
        status
    )
VALUES (
        OLD.login,
        OLD.password,
        OLD.role,
        OLD.full_name,
        OLD.company_id,
        current_timestamp,
        'deleted'
    );
RETURN OLD;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER after_delete_audit_users
AFTER DELETE ON users FOR EACH ROW EXECUTE FUNCTION audit_users_delete_trigger();