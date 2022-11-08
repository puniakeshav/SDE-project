import joblib
import sys
import tensorflow as tf
import tensorflow_hub as hub
import os
os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"

tf.compat.v1.disable_eager_execution()

embed = hub.load("https://tfhub.dev/google/universal-sentence-encoder/4")
sys.stdout.write('Module loaded')

vectors = []
sys.stdout.write('Getting the vectors...\n')

gpu_options = tf.compat.v1.GPUOptions(visible_device_list="0")
sess = tf.compat.v1.Session(config=tf.compat.v1.ConfigProto(gpu_options=gpu_options))
sess.run([tf.compat.v1.global_variables_initializer(), tf.compat.v1.tables_initializer()])

clf1 = joblib.load('finalized1_model.sav')
clf2 = joblib.load('finalized2_model.sav')

seg = [['','','facebook','very bad faceb infernece unable to login','']]


texts = []
for row in seg:
    text = row[3]
    if text.lower().startswith('to ') or text.lower().startswith('if '):
        text = text[3:]
    if not row[2].startswith('(missing)'):
        subj = row[2].replace('(','').replace(')','')
        if not subj in text:
            text = subj+' '+text
    texts.append(text)
embeddings = embed(texts)
vectors = sess.run(embeddings)

R1 = clf1.predict_proba(vectors)
R2 = clf2.predict_proba(vectors)

for ridx, row in enumerate(seg):
    C1 = R1[ridx][1]
    C2 = R2[ridx][1]
    # EID = int(row[0])
    aaa = C1 # Action
    bbb = C2 # Problem
    rrr = 0  # Neither
    if C1 >= 0.5:
        if C2 >= 0.5:
            rrr = 2 * (1 - C1) * (1 - C2)
        else:
            rrr = 1 - C1
    else:
        if C2 >= 0.5:
            rrr = 1 - C2
        else:
            rrr = 0.5
    sss = aaa + bbb + rrr
    aaa /= sss
    bbb /= sss
    rrr /= sss
    # print([str(EID), str(rrr), str(aaa), str(bbb)])
    print([str(rrr), str(aaa), str(bbb)])