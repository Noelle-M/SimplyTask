<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230423150435 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__tags AS SELECT id, name, color FROM tags');
        $this->addSql('DROP TABLE tags');
        $this->addSql('CREATE TABLE tags (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, name VARCHAR(10) NOT NULL, color VARCHAR(10) NOT NULL, CONSTRAINT FK_6FBC9426A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO tags (id, name, color) SELECT id, name, color FROM __temp__tags');
        $this->addSql('DROP TABLE __temp__tags');
        $this->addSql('CREATE INDEX IDX_6FBC9426A76ED395 ON tags (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__tags AS SELECT id, name, color FROM tags');
        $this->addSql('DROP TABLE tags');
        $this->addSql('CREATE TABLE tags (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(10) NOT NULL, color VARCHAR(10) NOT NULL, id_user INTEGER NOT NULL)');
        $this->addSql('INSERT INTO tags (id, name, color) SELECT id, name, color FROM __temp__tags');
        $this->addSql('DROP TABLE __temp__tags');
    }
}
