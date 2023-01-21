import collections

def get_rank():
    
    with open("./modules/text/records.txt") as f:
        sentence_lists = f.readlines()
    
    col = collections.Counter(sentence_lists)
    sentence_list = col.most_common()
    sentence = []
    if len(sentence_list) >= 5:
        sentence.append(sentence_list[0][0])
        sentence.append(sentence_list[1][0])
        sentence.append(sentence_list[2][0])
        sentence.append(sentence_list[3][0])
        sentence.append(sentence_list[4][0])
    else:
        for i in range(len(sentence_list)):
            sentence.append(sentence_list[i][0])
        sentence.append("")
        sentence.append("")
        sentence.append("")
        sentence.append("")
        sentence.append("")
    return sentence

def main():
    get_rank()

if __name__ == '__main__':
    main() 
