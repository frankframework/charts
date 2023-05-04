{{/*
Create the name of the service account to use
*/}}
{{- define "zaakbrug.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "zaakbrug.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}