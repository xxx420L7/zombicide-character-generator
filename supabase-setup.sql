-- Crear tabla de personajes
CREATE TABLE IF NOT EXISTS characters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  character_data JSONB NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_characters_user_id ON characters(user_id);
CREATE INDEX idx_characters_created_at ON characters(created_at);

-- Políticas de seguridad (RLS)
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;

-- Los usuarios pueden ver sus propios personajes
CREATE POLICY "Users can view own characters" ON characters
  FOR SELECT USING (auth.uid() = user_id);

-- Los usuarios pueden insertar sus propios personajes
CREATE POLICY "Users can insert own characters" ON characters
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Los usuarios pueden actualizar sus propios personajes
CREATE POLICY "Users can update own characters" ON characters
  FOR UPDATE USING (auth.uid() = user_id);

-- Los usuarios pueden eliminar sus propios personajes
CREATE POLICY "Users can delete own characters" ON characters
  FOR DELETE USING (auth.uid() = user_id);

-- Function para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_characters_updated_at
  BEFORE UPDATE ON characters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();