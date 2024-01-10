#!/usr/bin/env python
# coding: utf-8

# In[24]:

import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
get_ipython().run_line_magic('matplotlib', 'inline')
import math

pharm = pd.read_csv(r"C:\Users\satish\Downloads\pharming_data.csv")
pharm

# In[25]:


print(str(len(pharm.index)))


# ## Analysing Data

# In[26]:


sns.countplot(x="Security Measures", data=pharm)


# In[27]:


sns.countplot(x="Security Measures", hue="Resolution Time" ,data=pharm)


# In[28]:


sns.countplot(x="Security Measures", hue="Attack Type",data=pharm)


# In[29]:


sns.countplot(x="Security Measures", hue="Geographical Information",data=pharm)


# In[30]:


pharm.info()


# In[31]:


pharm.isnull()


# In[32]:


pharm.isnull().sum()


# In[33]:


pharm


# In[34]:


sns.heatmap(pharm.isnull(), yticklabels=False)


# In[35]:


pharm.drop("Column1", axis=1, inplace=True)


# In[36]:


pharm.dropna(inplace=True)


# In[37]:


sns.heatmap(pharm.isnull(),yticklabels=False, cbar=False)


# In[38]:


pharm.isnull().sum()


# In[39]:


dns=pd.get_dummies(pharm['Geographical Information'],drop_first=True)
dns.head(5)


# In[40]:


atc=pd.get_dummies(pharm['Attack Type'],drop_first=True)
atc.head(5)


# In[41]:


time=pd.get_dummies(pharm['Resolution Time'],drop_first=True)
time.head()


# In[42]:


pharm=pd.concat([pharm,dns,atc,time],axis=1)
pharm.head(5)


# In[43]:


pharm.drop(['Timestamp','Domain Name', 'IP Address', 'Original IP Address', 'DNS Requests', 'Attack Type', 'Geographical Information', 'Detection Flags', 'Resolution Time'],axis=1, inplace=True)
pharm.head(5)


# In[44]:


X=pharm.drop("Security Measures", axis=1)
y=pharm["Security Measures"]


# In[45]:


from sklearn.model_selection import train_test_split

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1)


# In[46]:


from sklearn.linear_model import LogisticRegression
logmodel=LogisticRegression()


# In[47]:


logmodel.fit(X_train, y_train)


# In[48]:


predictions=logmodel.predict(X_test)


# In[49]:


from sklearn.metrics import classification_report
classification_report(y_test, predictions)


# In[50]:


from sklearn.metrics import confusion_matrix
confusion_matrix(y_test, predictions)


# In[51]:


from sklearn.metrics import accuracy_score
accuracy_of_model=accuracy_score(y_test, predictions)


# In[58]:


from sklearn.feature_extraction.text import TfidfVectorizer
print("Accuracy: ", accuracy_of_model * 100, "%")

# Example input for prediction
new_input = pd.DataFrame({
    'DNS Spoofing': [True],' Type: A Rec': [False],' Type: AAAA Rec': [True],'No DNSSEC': [False],
})

# Use the trained model to make predictions
prediction = logmodel.predict(new_input)

# Display the prediction
if prediction[0] == 1:
    print("Attack detected (pharming)")
else:
    print("Non-attack (legitimate domain)")




