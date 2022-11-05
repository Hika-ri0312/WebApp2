import spacy 
import numpy as np
import modules.convert_csv  as conv

nlp  = spacy.load('ja_ginza')


def text_vector(text):
    doc = nlp(text)
    #for token in doc:  # Token単位で処理結果を参照。
    #    print(token.i, token.lemma_, token.pos_)

    vec = doc.vector
    
    return vec

def cos_sim(v1,v2):
    return np.dot(v1,v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

def cos_distance(text1):
    vec1 = text_vector(text1)
    qa_vec, qa_lists = zip(*conv.load_csv())
    angles = []
    for vec2 in qa_vec:
        angles.append(cos_sim(vec1,vec2))
    idx = np.asarray(angles).argmax()
    ret_ans = qa_lists[idx]
    #print(angles)
    #print(vec1)
    #print(qa_vec[idx])
    #print(cos_sim(vec1,qa_vec[idx]))
    if not(cos_sim(vec1,qa_vec[idx]) > 0.55):
        ret_ans = "すみません、よくわかりません"
    
    return ret_ans


    
    
if __name__ == "__main__":
    text1 = "夏休みはいつですか"
    text2 = "春休みはいつですか"
    
    #print(cos_distance(text1,text2))
    
