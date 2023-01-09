def get_rank():
    
    with open("./modules/text/records.txt") as f:
        sentence_list = f.readlines()
    
    # print(sentence_list[-1])
    # print(sentence_list[-2])
    # print(sentence_list[-3])
    return sentence_list

def main():
    get_rank()

if __name__ == '__main__':
    main() 