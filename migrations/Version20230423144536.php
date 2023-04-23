<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230423144536 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE tags (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(10) NOT NULL, color VARCHAR(10) NOT NULL, id_user INTEGER NOT NULL)');
        $this->addSql('CREATE TABLE tasks (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(255) NOT NULL, duree INTEGER DEFAULT NULL, marge_securite INTEGER DEFAULT NULL, priority INTEGER NOT NULL, archive BOOLEAN NOT NULL, id_user INTEGER NOT NULL)');
        $this->addSql('CREATE TABLE tasks_tags (tasks_id INTEGER NOT NULL, tags_id INTEGER NOT NULL, PRIMARY KEY(tasks_id, tags_id), CONSTRAINT FK_85533A50E3272D31 FOREIGN KEY (tasks_id) REFERENCES tasks (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_85533A508D7B4FB4 FOREIGN KEY (tags_id) REFERENCES tags (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_85533A50E3272D31 ON tasks_tags (tasks_id)');
        $this->addSql('CREATE INDEX IDX_85533A508D7B4FB4 ON tasks_tags (tags_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE tags');
        $this->addSql('DROP TABLE tasks');
        $this->addSql('DROP TABLE tasks_tags');
    }
}
