CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_users_login ON users(login);
CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_tasks_company_id ON tasks(company_id);
CREATE INDEX idx_tasks_parent_id ON tasks(parent_id);
CREATE INDEX idx_user_tasks_user_id ON user_tasks(user_id);
CREATE INDEX idx_user_tasks_task_id ON user_tasks(task_id);
CREATE INDEX idx_audit_companies_name ON audit_companies(name);
CREATE INDEX idx_audit_users_login ON audit_users(login);
CREATE INDEX idx_audit_users_company_id ON audit_users(company_id);