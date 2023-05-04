{{- /*
ff-common.metadata creates a standard metadata header.
It creates a 'metadata:' section with name and labels.
*/ -}}
{{ define "ff-common.metadata" -}}
metadata:
  name: {{ template "ff-common.fullname" . }}
  labels:
{{ include "ff-common.labels" . | indent 4 -}}
{{- end -}}
