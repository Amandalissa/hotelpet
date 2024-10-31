create database woofing;
use woofing;

create table enderecos (
	id int auto_increment,
    pais varchar(25) not null default "Brasil",
    estado varchar(25) not null,
    cidade varchar(25) not null,
    rua varchar(50) not null,
    bairro varchar(30) not null,
    numero int(3) not null,
    cep varchar(8) not null unique,
    
    constraint pk_enderecos primary key (id)
);

create table refresh_tokens (
    id int auto_increment,
    token varchar(200) not null unique,
    atualizado_em datetime not null default now(),
    
    constraint pk_refresh_tokens primary key (id)
);

create table refresh_tokens_clientes (
    refresh_token_id int not null,
    
    constraint pk_refresh_tokens_clientes primary key (refresh_token_id),
    constraint fk_refresh_tokens_clientes foreign key (refresh_token_id) references refresh_tokens (id) on delete cascade
);

create table refresh_tokens_hoteis (
    refresh_token_id int not null,
    
    constraint pk_refresh_tokens_hoteis primary key (refresh_token_id),
    constraint fk_refresh_tokens_hoteis foreign key (refresh_token_id) references refresh_tokens (id) on delete cascade
);

create table refresh_tokens_admins (
    refresh_token_id int not null,
    
    constraint pk_refresh_tokens_admins primary key (refresh_token_id),
    constraint fk_refresh_tokens_admins foreign key (refresh_token_id) references refresh_tokens (id) on delete cascade
);

create table clientes (
	id int auto_increment,
    nome varchar(100) not null,
    email varchar(50) not null unique,
    senha varchar(300) not null,
    cpf varchar(11) not null unique,
    celular varchar(12) not null,
    ativo bit not null default true,
    endereco_id int not null unique,
    refresh_token_id int null unique,
    
    constraint pk_clientes primary key (id),
    constraint fk_clientes_enderecos foreign key (endereco_id) references enderecos (id) on delete restrict,
    constraint fk_clientes_refresh_tokens_clientes foreign key (refresh_token_id) references refresh_tokens_clientes (refresh_token_id) on delete set null
);

create table hoteis (
	id int auto_increment,
    razao_social varchar(100) not null unique,
    email varchar(50) not null unique,
    senha varchar(300) not null,
    cnpj varchar(14) not null unique,
    celular varchar(12) not null,
    aprovado bit not null default false,
    endereco_id int not null unique,
    refresh_token_id int null unique,
    
    constraint pk_hoteis primary key (id),
    constraint fk_hoteis_enderecos foreign key (endereco_id) references enderecos (id) on delete restrict,
	constraint fk_hoteis_refresh_tokens_hoteis foreign key (refresh_token_id) references refresh_tokens_hoteis (refresh_token_id) on delete set null
);

create table acomodacoes (
	id int auto_increment,
    maximo int(2) not null,
    hotel_id int not null,
    
    constraint pk_hoteis primary key (id),
    constraint pk_acomodacoes_hoteis foreign key (hotel_id) references hoteis (id) on delete cascade
);

create table animais (
	id int auto_increment,
    nome varchar(100) not null,
    tamanho double not null,
    sexo bit not null,
    temperamento varchar(20) not null,
    raca varchar(20) not null,
    cliente_id int not null,
    
    constraint pk_animais primary key (id),
    constraint fk_animais_clientes foreign key (cliente_id) references clientes (id) on delete cascade
);

create table cachorros (
    animal_id int not null,
    
    constraint pk_cachorros primary key (animal_id),
    constraint fk_cachorros_animais foreign key (animal_id) references animais (id) on delete cascade
);

create table gatos (
    animal_id int not null,
    
    constraint pk_gatos primary key (animal_id),
    constraint fk_gatos_animais foreign key (animal_id) references animais (id) on delete cascade
);

create table admins (
    id int auto_increment,
    nome varchar(100) not null,
    email varchar(50) not null unique,
    senha varchar(300) null,
    cpf varchar(11) not null unique,
	root bit not null default 0,
    refresh_token_id int null unique,
    
    constraint pk_admins primary key (id),
    constraint fk_admins_refresh_tokens_admins foreign key (refresh_token_id) references refresh_tokens_admins (refresh_token_id) on delete set null
);

create table tokens_recuperacao (
    id int auto_increment,
    token varchar(6) not null,
    criado_em datetime not null default now(),
    nome_papel varchar(15) not null,
    cliente_id int null,
    hotel_id int null,
    admin_id int null,
    
    constraint pk_tokens_recuperacao primary key (id),
    constraint fk_tokens_recuperacao_clientes foreign key (cliente_id) references clientes (id) on delete cascade,
    constraint fk_tokens_recuperacao_hoteis foreign key (hotel_id) references hoteis (id) on delete cascade,
    constraint fk_tokens_recuperacao_admins foreign key (admin_id) references admins (id) on delete cascade
);

create table solicitacoes (
    id int auto_increment,
    descricao varchar(100) not null,
    observacoes varchar(100) null,
    status varchar(20) not null,
	criado_em datetime not null default now(),
    finalizado_em datetime null,
    criado_por int not null,
    atendido_por int null,
    
    constraint pk_solicitacoes primary key (id),
    constraint fk_solicitacoes_clientes foreign key (criado_por) references clientes (id) on delete cascade,
    constraint fk_solicitacoes_admins foreign key (atendido_por) references admins (id) on delete set null
);

create table hoteis_aprovacoes (
    id int auto_increment,
    aprovado bit not null default 0,
	criado_em datetime not null default now(),
    finalizado_em datetime null,
    criado_por int not null,
    atendido_por int null,
    
    constraint pk_hoteis_aprovacoes primary key (id),
    constraint fk_hoteis_aprovacoes_hoteis foreign key (criado_por) references hoteis (id) on delete cascade,
    constraint fk_hoteis_aprovacoes_admins foreign key (atendido_por) references admins (id) on delete set null
);

create table reservas (
    id int auto_increment,
    valor double not null,
	data_hora_inicio datetime not null,
    data_hora_fim datetime not null,
    cliente_id int not null,
    acomodacao_id int not null,
    animal_id int not null,
    
    constraint pk_reservas primary key (id),
    constraint fk_reservas_clientes foreign key (cliente_id) references clientes (id) on delete cascade,
    constraint fk_reservas_acomodacoes foreign key (acomodacao_id) references acomodacoes (id) on delete cascade,
    constraint fk_reservas_animais foreign key (animal_id) references animais (id) on delete cascade
);

create table avaliacoes (
    id int auto_increment,
    nota double not null,
    hotel_id int not null,
    cliente_id int not null,
    
    constraint pk_avaliacoes primary key (id),
    constraint fk_avaliacoes_hoteis foreign key (hotel_id) references hoteis (id) on delete cascade,
    constraint fk_avaliacoes_clientes foreign key (cliente_id) references clientes (id) on delete cascade
);

create table notificacoes (
    id int auto_increment,
    texto varchar(100) not null,
    criado_em datetime not null default now(),
    nome_papel varchar(15) not null,
    cliente_id int null,
    hotel_id int null,
    admin_id int null,
    
    constraint pk_notificacoes primary key (id),
    constraint fk_notificacoes_clientes foreign key (cliente_id) references clientes (id) on delete cascade,
    constraint fk_notificacoes_hoteis foreign key (hotel_id) references hoteis (id) on delete cascade,
    constraint fk_notificacoes_admins foreign key (admin_id) references admins (id) on delete cascade
);

CREATE TABLE suporte_solicitacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    mensagem VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
    status ENUM('open', 'in progress', 'closed') NOT NULL DEFAULT 'open',
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
