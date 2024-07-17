from os import environ


class Service:
    def __init__(self, name):
        self.name = name

    @property
    def fqdn(self):
        return environ.get(f"{self.name.upper()}_FQDN")

    @property
    def url(self):
        return f"http://{self.fqdn}"

    def __eq__(self, other):
        return self.name == other


services = [
    Service("mail"),
]
