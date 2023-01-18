import spacy 
import numpy as np
import pandas as pd
import scipy.spatial.distance as dis
import modules.pdf2csv  as p2c
import glob
import MeCab
import ipadic



nlp  = spacy.load('ja_ginza')
p2c.pdf2csv(0)


def text_vector(text):
#    doc = nlp(text)
#    for token in doc:  # Token単位で処理結果を参照。
#        print(token.i, token.lemma_, token.pos_)
#    vec = doc.vector
#    return vec

    # model_dir = './jawiki.doc2vec.dbow300d/jawiki.doc2vec.dbow300d.model'
    # model = models.Doc2Vec.load(model_dir)

    CHASEN_ARGS = r' -F "%m\t%f[7]\t%f[6]\t%F-[0,1,2,3]\t%f[4]\t%f[5]\n"'
    CHASEN_ARGS += r' -U "%m\t%m\t%m\t%F-[0,1,2,3]\t\t\n"'
    m = MeCab.Tagger(ipadic.MECAB_ARGS + CHASEN_ARGS)

    nouns = [line for line in m.parse(text).splitlines() if "名詞" in line.split()[-1]]
    # logger.info(nouns)
    print(nouns)
    string = ""


    for str in nouns:
    #print(str.split())
        string = string +  str.split()[0]
    #print(string)
    doc = nlp(string)
    vec = doc.vector

    return vec

def load_csv():
    file = glob.glob("./modules/text/csv/*")
    qa_lists = pd.DataFrame(
        data={'question': [], 
              'answer': [],
              'source': []
              }
    )
    for path in file:
        read_qa_list = pd.read_csv(path)
        qa_lists=pd.merge(qa_lists,read_qa_list,how="outer", on = ['question','answer','source'])

    qa_vec = []
    qa_list = qa_lists['question']

    for qa in qa_list:
        qa_vec.append(text_vector(qa))

    qa_list_zip = zip(list(qa_vec), list(qa_lists["question"]), list(qa_lists["answer"]), list(qa_lists["source"]))

    return qa_list_zip
    

def main():
    load_csv()
   
if __name__ == "__main__":
    main() 
    
