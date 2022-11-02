import spacy 
import numpy as np
import scipy.spatial.distance as dis

nlp  = spacy.load('ja_ginza')


def text_vector(text):
    doc = nlp(text)
    for token in doc:  # Token単位で処理結果を参照。
        print(token.i, token.lemma_, token.pos_)

    vec = doc.vector
    
    return vec

def cos_distance(text1,text2):
    vec1 = text_vector(text1)
    vec2 = text_vector(text2)
    
    distances = dis.cosine(vec1,vec2)
    return distances
    
    
if __name__ == "__main__":
    text1 = "夏休みはいつですか"
    text2 = "春休みはいつですか"
    
    print(cos_distance(text1,text2))
    
