import spacy 
import numpy as np
import pandas as pd
import scipy.spatial.distance as dis
import glob



nlp  = spacy.load('ja_ginza')


def text_vector(text):
    doc = nlp(text)
#    for token in doc:  # Token単位で処理結果を参照。
#        print(token.i, token.lemma_, token.pos_)

    vec = doc.vector
    
    return vec

def load_csv():
    file = glob.glob("./modules/text/csv/*")
    qa_lists = pd.DataFrame(
        data={'question': [], 
              'answer': []
              }
    )
    for path in file:
        read_qa_list = pd.read_csv(path)
        qa_lists=pd.merge(qa_lists,read_qa_list,how="outer", on = ['question','answer'])
    qa_lists
    qa_lists.to_csv("./sample.csv",columns=['question','answer'])
    qa_vec = []
    qa_list = qa_lists['question']

    for qa in qa_list:
        qa_vec.append(text_vector(qa))
    
    qa_list_zip = zip(list(qa_vec), list(qa_lists["answer"]))

    return qa_list_zip
    

def main():
    load_csv()
   
if __name__ == "__main__":
    main() 
    
