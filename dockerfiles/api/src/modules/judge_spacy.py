import spacy 
import numpy as np
import scipy.spatial.distance as dis
import modules.convert_csv  as conv

nlp  = spacy.load('ja_ginza')


def text_vector(text):
    doc = nlp(text)
    for token in doc:  # Token単位で処理結果を参照。
        print(token.i, token.lemma_, token.pos_)

    vec = doc.vector
    
    return vec

def cos_distance(text1):
    vec1 = text_vector(text1)
    #vec2 = text_vector(text2)
    qa_vec, qa_lists = zip(*conv.load_csv())
    #idx = np.abs(np.asarray(qa_vec) - vec1).argmin()
    angles = []
    for vec2 in qa_vec:
        angles.append(dis.cosine(vec1,vec2))
    idx = np.abs(np.asarray(angles)).argmin()
    
    #distances = dis.cosine(vec1,vec2)
    return qa_lists[idx]


    
    
if __name__ == "__main__":
    text1 = "夏休みはいつですか"
    text2 = "春休みはいつですか"
    
    print(cos_distance(text1,text2))
    
