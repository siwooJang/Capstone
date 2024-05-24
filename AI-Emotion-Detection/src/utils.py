import os
import random
import logging

import torch
import numpy as np

from sklearn.metrics import precision_score, recall_score, f1_score, classification_report

from transformers import (
    BertConfig,
    DistilBertConfig,
    ElectraConfig,
    BertTokenizer,
    ElectraTokenizer,
    BertForSequenceClassification,
    DistilBertForSequenceClassification,
    ElectraForSequenceClassification
)
from tokenization_kobert import KoBertTokenizer

MODEL_CLASSES = {
    'kobert': (BertConfig, BertForSequenceClassification, KoBertTokenizer),
    'distilkobert': (DistilBertConfig, DistilBertForSequenceClassification, KoBertTokenizer),
    'bert': (BertConfig, BertForSequenceClassification, BertTokenizer),
    'kobert-lm': (BertConfig, BertForSequenceClassification, KoBertTokenizer),
    'koelectra-base': (ElectraConfig, ElectraForSequenceClassification, ElectraTokenizer),
    'koelectra-small': (ElectraConfig, ElectraForSequenceClassification, ElectraTokenizer),
}

MODEL_PATH_MAP = {
    'kobert': 'monologg/kobert',
    'distilkobert': 'monologg/distilkobert',
    'bert': 'bert-base-multilingual-cased',
    'kobert-lm': 'monologg/kobert-lm',
    'koelectra-base': 'monologg/koelectra-base-discriminator',
    'koelectra-small': 'monologg/koelectra-small-discriminator',
}


def get_label(args):
    return [0, 1, 2, 3, 4, 5, 6]

label_names = ['중립', '분노', '슬픔', '불안', '상처', '당황', '기쁨']  # for eval view

label2id = {
    '중립': 0, 
    '분노': 1, 
    '슬픔': 2, 
    '불안': 3, 
    '상처': 4, 
    '당황': 5, 
    '기쁨': 6
}

def load_tokenizer(args):
    return MODEL_CLASSES[args.model_type][2].from_pretrained(args.model_name_or_path)


def init_logger():
    logging.basicConfig(format='%(asctime)s - %(levelname)s - %(name)s -   %(message)s',
                        datefmt='%m/%d/%Y %H:%M:%S',
                        level=logging.INFO)


def set_seed(args):
    random.seed(args.seed)
    np.random.seed(args.seed)
    torch.manual_seed(args.seed)
    if not args.no_cuda and torch.cuda.is_available():
        torch.cuda.manual_seed_all(args.seed)


def compute_metrics(labels, preds):  # switch arg order
    assert len(preds) == len(labels)
    return acc_score(preds, labels)


def simple_accuracy(preds, labels):
    return (preds == labels).mean()


def acc_score(preds, labels):
    return {
        "accuracy": simple_accuracy(preds, labels),
    #     "precision": precision_score(labels, preds, average=None),
    #     "recall": recall_score(labels, preds, average=None),
    #     "f1": f1_score(labels, preds, average=None)
    }
    
def show_report(labels, preds):
    return classification_report(labels, preds, target_names=label_names)
