-- Table: public.summarized

-- DROP TABLE IF EXISTS public.summarized;

CREATE TABLE IF NOT EXISTS public.summarized
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    input_text text COLLATE pg_catalog."default" NOT NULL,
    summarized_text text COLLATE pg_catalog."default" NOT NULL,
    user_id character varying(20) COLLATE pg_catalog."default" NOT NULL
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.summarized
    OWNER to encvegpm;
