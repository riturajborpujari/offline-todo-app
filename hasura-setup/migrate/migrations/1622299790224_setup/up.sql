CREATE TABLE public.todo (
    id bigint NOT NULL,
    title text NOT NULL,
    description text,
    checked boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.todo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.todo_id_seq OWNED BY public.todo.id;
ALTER TABLE ONLY public.todo ALTER COLUMN id SET DEFAULT nextval('public.todo_id_seq'::regclass);
ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);
